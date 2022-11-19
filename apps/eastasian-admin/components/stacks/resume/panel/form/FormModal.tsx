import { FC, ReactNode, useState } from 'react';
import { Modal } from '@mantine/core';

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void | Promise<void>;
  title: string;
  children: ReactNode;
};

export const FormModal: FC<FormModalProps> = (props) => {
  const { isOpen, onClose, title, children } = props;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={title}
      size="100%"
      overflow="inside"
      sx={{
        '.mantine-Modal-title': {
          color: '#1864AB',
          fontSize: '20px',
          fontWeight: 'bold',
        },
      }}
    >
      {children}
    </Modal>
  );
};

export const useFormModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return [isOpen, setIsOpen] as const;
};
