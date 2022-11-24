import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { listWork, createWork, updateWork, deleteWork } from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useWorkInputStore } from '@admin/store';

import { StackSelect, useStackSelect, PanelLayout } from '.';
import { FormModal, useFormModal, WorkForm } from './form';
import { WorkList } from './list';

export const WorksPanel = () => {
  const { workInput, setWorkInput, resetWorkInput } = useWorkInputStore(
    (store) => store
  );
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { stacks, selectedStacks, onClickStack, initSelectedStack } =
    useStackSelect();
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listWork();
        setWorks([...works, ...data.works]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    resetWorkInput();
    initSelectedStack();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createWork({ ...d, stackIds: selectedStacks });
      setWorks((prevWorks) => [...prevWorks, data.work]);
      showNotification({ message: 'work created' });
      resetWorkInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateWork(workInput.id, {
        ...d,
        stackIds: selectedStacks,
        prevStackIds: workInput.stackIds,
      });
      setWorks((prevWorks) =>
        prevWorks.map((work) => (work.id !== data.work.id ? work : data.work))
      );
      showNotification({ message: 'work updated' });
      resetWorkInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const work = works.find((work) => work.id === id);
    setWorkInput({ ...work, stackIds: work.stacks.map((stack) => stack.id) });
    initSelectedStack(work.stacks.map((stack) => stack.id));
    setIsFormModalOpen(true);
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteWork(id);
      setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
      showNotification({ message: 'work deleted' });
      resetWorkInput();
      initSelectedStack();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onCancel = () => {
    resetWorkInput();
    initSelectedStack();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Works"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="Work">
        <WorkForm
          workInput={workInput}
          onCancel={onCancel}
          onSubmit={workInput.id ? onSubmitEdit : onSubmitCreate}
        >
          <StackSelect
            stacks={stacks}
            onClickStack={onClickStack}
            selectedStacks={selectedStacks}
          />
        </WorkForm>
      </FormModal>
      <WorkList
        onEdit={onEdit}
        onDelete={onSubmitDelete}
        works={works}
        loading={loading}
      />
    </PanelLayout>
  );
};
