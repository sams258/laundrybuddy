import React from "react";
import PropTypes from "prop-types";
import { addDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import {
  Button,
  Card,
  ListGroup,
  Alert,
  Col,
  Row,
  Container,
} from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { filterAvailableSlots, formatDate } from "./utils";
import "./styles.css";

const WeekView = ({ slots, selectedDate, handleBooking }) => {
  const startOfWeekDate = startOfWeek(selectedDate);
  const endOfWeekDate = endOfWeek(selectedDate);

  const filteredSlots = filterAvailableSlots(slots).filter((slot) => {
    const slotDate = new Date(slot.date);
    return slotDate >= startOfWeekDate && slotDate <= endOfWeekDate;
  });

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(addDays(startOfWeekDate, i));
  }

  return (
    <Container className="booking-view">
      <h2>Week View</h2>
      <Row>
        {daysOfWeek.map((day) => (
          <Col key={day.toISOString()} className="mb-3">
            <Card>
              <Card.Header>{day.toDateString()}</Card.Header>
              <Card.Body className="cardPad">
                {filteredSlots.filter((slot) =>
                  isSameDay(new Date(slot.date), day)
                ).length > 0 ? (
                  <ListGroup>
                    {filteredSlots
                      .filter((slot) => isSameDay(new Date(slot.date), day))
                      .map((slot) => (
                        <ListGroup.Item className="listPad" key={slot._id}>
                          <Button
                            variant="success"
                            onClick={() => handleBooking(slot._id)}
                          >
                            {slot.time} - Book Slot
                          </Button>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                ) : (
                  <Alert variant="danger">No available slots for this day.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

WeekView.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      availability: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleBooking: PropTypes.func.isRequired,
};

export default WeekView;
