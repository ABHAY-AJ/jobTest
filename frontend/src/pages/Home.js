import React from 'react';
import { Button, Row, Col, Typography, Carousel, Card } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css'; // Import custom CSS file

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="home-container">
      {/* Carousel */}
      <div className="carousel-container">
        <Carousel
          autoplay
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          className="carousel"
        >
          <div className="carousel-slide">
            <Card cover={<img alt="slide-1" src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202405/6641ea0796d7e-skoch-report-514-million-jobs-created-between-2014-and-2024-132302269-16x9.png?size=1200:675" />}>
              <Card.Meta title="Slide 1" description="Description for slide 1" />
            </Card>
          </div>
          <div className="carousel-slide">
            <Card cover={<img alt="slide-2" src="https://clipart-library.com/2023/web-top-jobs10.jpg" />}>
              <Card.Meta title="Slide 2" description="Description for slide 2" />
            </Card>
          </div>
          <div className="carousel-slide">
            <Card cover={<img alt="slide-3" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202112/stockvault-job-opportunity2594_1200x768.jpeg?size=1200:675" />}>
              <Card.Meta title="Slide 3" description="Description for slide 3" />
            </Card>
          </div>
          <div className="carousel-slide">
            <Card cover={<img alt="slide-4" src="https://media.telanganatoday.com/wp-content/uploads/2022/06/Job-Vacancy.jpg" />}>
              <Card.Meta title="Slide 4" description="Description for slide 4" />
            </Card>
          </div>
          <div className="carousel-slide">
            <Card cover={<img alt="slide-5" src="https://www.careerguide.com/career/wp-content/uploads/2023/11/Jobs-in-Australia.png" />}>
              <Card.Meta title="Slide 5" description="Description for slide 5" />
            </Card>
          </div>
        </Carousel>
      </div>

      <Row justify="center" className="welcome-section">
        <Col xs={24} sm={20} md={12}>
          <Title level={1}>Welcome to the Job & Internship Portal</Title>
          <Paragraph>
            Find and apply for the best jobs and internships here. We provide a wide range of opportunities to help you achieve your career goals.
          </Paragraph>
          <Button type="primary" size="large" className="view-jobs-btn">
            <Link to="/jobs" style={{ textDecoration: "none" }}>View Jobs</Link>
          </Button>
          <Button type="default" size="large" className="view-internships-btn">
            <Link to="/internships" style={{ textDecoration: "none" }}>View Internships</Link>
          </Button>
        </Col>
      </Row>

      {/* Featured Jobs Section */}
      <div className="featured-jobs">
        <Title level={2}>Featured Jobs</Title>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Software Engineer"
              bordered={false}
              cover={<img alt="Software Engineer" src="https://assets.plan.io/images/blog/become-a-more-productive-software-engineer.png" />}
            >
              <Paragraph>
                An exciting opportunity to work with a dynamic team on cutting-edge technology projects.
              </Paragraph>
              <Button type="link">
                <Link to="/jobs/1">Learn More</Link>
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Marketing Specialist"
              bordered={false}
              cover={<img alt="Marketing Specialist" src="https://longlist.io/_next/image?url=https%3A%2F%2Fcdn.longlist.io%2Fmarketing_specialist_job_description_3b9cadf273.webp&w=1200&q=75" />}
            >
              <Paragraph>
                Join our marketing team and help us drive growth through innovative strategies and campaigns.
              </Paragraph>
              <Button type="link">
                <Link to="/jobs/2">Learn More</Link>
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Graphic Designer"
              bordered={false}
              cover={<img alt="Graphic Designer" src="https://www.liveabout.com/thmb/ss8yMyi_nK15Dp9Vyk4bwq0ydJ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/graphic-designer-job-description-and-salary-information-2061790-edit-4335087e524b4504b76ae1fea22873cf.jpg" />}
            >
              <Paragraph>
                A creative role for designing engaging visual content for various platforms.
              </Paragraph>
              <Button type="link">
                <Link to="/jobs/3">Learn More</Link>
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <Title level={2}>What Our Users Say</Title>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Paragraph>
                "This portal made job hunting so much easier. The interface is user-friendly and the job listings are up-to-date."
              </Paragraph>
              <Title level={5}>- Rohan</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Paragraph>
                "I found my dream internship through this platform. The process was smooth and the support was excellent."
              </Paragraph>
              <Title level={5}>- Kapil</Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
