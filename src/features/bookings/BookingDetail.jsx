import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { useCheckout } from "../check-in-out/useCheckout";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckout();
  const { booking = {}, isLoading } = useBooking();
  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
