import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const ModalForm = ({ formData, isOpen, toggle, onSubmit }) => {
  // formData, form alanlarının ve başlangıç değerlerinin olduğu bir dizi olmalı
  // Örnek formData: [{ label: 'Ders Adı', name: 'lessonName', value: '' }, ...]
  
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal Başlık</ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit}>
          {formData.map((field) => (
            <FormGroup key={field.name}>
              <Label for={field.name}>{field.label}</Label>
              <Input
                type="text"
                id={field.name}
                //value={field.value}
                onChange={(e) => {
                  // Kullanıcının verileri girerken formData state'ini güncelle
                  // Bunu burada yapmak yerine, formData'nın state olarak ana komponentte tutulması daha uygun olacaktır
                }}
                required
              />
            </FormGroup>
          ))}
          <Button color="primary" type="submit">
            Kaydet
          </Button>
          <Button color="secondary" onClick={toggle}>
            İptal
          </Button>
        </form>
      </ModalBody>
      {/* Bu kısmı değiştirebilir veya kaldırabilirsiniz */}
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Kapat
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalForm;
