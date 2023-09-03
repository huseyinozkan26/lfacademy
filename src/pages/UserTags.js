import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button } from "reactstrap";
import ModalForm from "../component/ModalForm";
import LiveMeet from "../component/LiveMeet"
import LiveMeetList from "../component/LiveMeetList"
import { getUserData } from "../firebase";

export default function UserTags() {
  const { user } = useSelector((state) => state.auth);
  const [userValues, setUserValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const formData = [
    { label: 'Ders Adı', name: 'lessonName',type: 'text', value: '' },
    { label: 'Ders Kategorisi', name: 'lessonCategory', type: 'text', value: '' },
  ]

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini işle
    // ...
    toggleModal(); // Modalı kapat
  };


  useEffect(() => {
    // getUserData fonksiyonunu çağırarak userValues state'ini güncelle
    getUserData(user.uid)
      .then((promiseResult) => {
        setUserValues({ ...promiseResult });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.uid]); // user.uid değiştiğinde useEffect yeniden çalışsın

  return (
    <>
      <Alert color="info">
        {user.displayName} || {userValues.role}
      </Alert>
      {userValues.role === "Öğretmen"?<LiveMeet></LiveMeet>:<p></p>}
      <ModalForm formData={formData} isOpen={modalOpen} toggle={toggleModal} onSubmit={handleSubmit} />
      <hr/>
      <LiveMeetList></LiveMeetList>
    </>
  );
}
