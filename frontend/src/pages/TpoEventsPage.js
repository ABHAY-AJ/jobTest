import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTpoEvents } from '../redux/tpo/tpoEventSlice/tpoEventSlice'; // Adjust import path as needed
import { Card, List, Button, Spin, message, Typography } from 'antd'; // Add Typography import
import { Link, useParams } from 'react-router-dom';
import { applyForTpoEvent } from '../redux/tpo/tpoEventSlice/tpoApplicationSlice';

const { Title, Text } = Typography;

const TpoEventsPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.tpoEvents);

    useEffect(() => {
        dispatch(fetchAllTpoEvents());
    }, [dispatch]);

    if (loading) {
        return <Spin tip="Loading Events..." />;
    }

    if (error) {
        return <p>Error fetching events: {error}</p>;
    }

    const handleApply = async () => {
        try {
          await dispatch(applyForTpoEvent(id)).unwrap();
          message.success('You have successfully applied for this event!');
        } catch (err) {
          message.error(err || 'Failed to apply for the event');
        }
      };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>All TPO Events</Title>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={events}
                renderItem={(event) => (
                    <List.Item>
                        <Card
                            title={event.title}
                            extra={<Link to={`/tpo-events/${event._id}`}>Details</Link>}
                        >
                            <Text><strong>Description:</strong> {event.description}</Text>
                            <br />
                            <Text><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Text>
                            <br />
                            <Text><strong>Venue:</strong> {event.venue}</Text>
                            <br />
                            <Text><strong>Posted By:</strong> {event.postedBy.name}</Text>
                            
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TpoEventsPage;
