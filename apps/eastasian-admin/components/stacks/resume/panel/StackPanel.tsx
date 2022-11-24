import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { listStack, createStack, updateStack, deleteStack } from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useStackInputStore } from '@admin/store';
import { uploadFile } from '@admin/libs/supabase';

import { PanelLayout } from '.';

import { FormModal, useFormModal, StackForm } from './form';

import { StackList } from './list';

export const StacksPanel = () => {
  const { setStackInput, stackInput, resetStackInput } = useStackInputStore(
    (state) => state
  );
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listStack();
        setStacks([...data.stacks]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  //NOTE(eastasian) initializing stack input form
  useEffect(() => {
    resetStackInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { icon, ...payload } = d;

      if (icon.length) {
        const file = icon[0];
        const publicUrl = await uploadFile('stacks', file);
        payload.stackImage = publicUrl;
      }

      const { data } = await createStack(payload);
      setStacks((prevStacks) => [...prevStacks, data.stack]);
      resetStackInput();
      setIsFormModalOpen(false);
    } catch (e) {
      console.log(e);
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id: string) => () => {
    const stack = stacks.find((stack) => stack.id === id);
    setStackInput(stack);
    setIsFormModalOpen(true);
  };

  const onSubmitEdit = async (d) => {
    try {
      const { icon, ...payload } = d;

      if (stackInput.stackImage) payload.stackImage = stackInput.stackImage;

      if (icon.length) {
        const file = icon[0];
        const publicUrl = await uploadFile('stacks', file);
        payload.stackImage = publicUrl;
      }

      const { data } = await updateStack(stackInput.id, { ...payload });
      setStacks((prevStacks) =>
        prevStacks.map((stack) =>
          data.stack.id !== stack.id ? stack : data.stack
        )
      );
      resetStackInput();
      showNotification({ message: 'stack updated' });
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteStack(id);
      setStacks((prevStacks) => prevStacks.filter((stack) => stack.id !== id));
      showNotification({ message: 'stack deleted' });
      resetStackInput();
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onCancel = () => {
    resetStackInput();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Stacks"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="stack">
        <StackForm
          stackInput={stackInput}
          onSubmit={stackInput.id ? onSubmitEdit : onSubmitCreate}
          onCancel={onCancel}
        />
      </FormModal>
      <StackList
        onDelete={onSubmitDelete}
        onEdit={onEdit}
        stacks={stacks}
        loading={loading}
      />
    </PanelLayout>
  );
};
