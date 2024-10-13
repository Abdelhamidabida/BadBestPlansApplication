import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import '../posts/post';

function Post() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <center><Row>
        <div className='loula'>
      <Col md={6} className="mb-4">
       
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img src='Images/pdp.jpg' className="rounded me-2"  width="40" height="30" alt="A" />
            <strong className="me-auto">Abdelhamid Abida</strong>
            <small>11 mins </small>
          </Toast.Header>
          <Toast.Body>Saha chribtkom, un très mauvais plan basbousa 
Maison Eric Kayser Tunisie d'une qualité médiocre hacha na3met rabi wel ghachech l2 tbereklou 😠</Toast.Body>
        </Toast>
      </Col>
      </div>
      <Col md={6} className="mb-2">
        
        <Toast onClose={toggleShowB} show={showB} animation={false}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Faten Fendri</strong>
            <small>29 mins </small>
          </Toast.Header>
          <Toast.Body>قبل ما نشجعو حد من معارفنا نتفقدو خدمتو 
            بالأخص مع الصغيرات هذا تشجيع عالفساد ما نتصور حد اشوف شي هذا و يقدم انو يبعتلو فيديو الله غالب عمرنا ما نسمعو الطرف الثاني 
             شوف قداش من حد تحيل عليه حسبي الله فيه في هالعواشر  انا موش مسيبتك لين تتحاكم.</Toast.Body>
        </Toast>
      </Col>
    </Row>
    </center>
  );
}

export default Post;