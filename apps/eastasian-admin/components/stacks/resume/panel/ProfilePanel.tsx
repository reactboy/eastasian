import { useEffect, useState } from 'react';
import { listProfile, updateProfile } from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useProfileInputStore } from '@admin/store';
import { uploadFile } from '@admin/libs/supabase';

import { PanelLayout } from '.';
import { FormModal, useFormModal, AboutForm } from './form';
import { ProfileList } from './list';

export const AboutPanel = () => {
  const { profileInput, setProfileInput, resetProfileInput } =
    useProfileInputStore();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

  useEffect(() => {
    resetProfileInput();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listProfile();
        setProfiles([...profiles, ...data.profiles]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const onSubmitEdit = async (d) => {
    try {
      const { profileImageFile, ...payload } = d;
      if (profileImageFile.length) {
        const file = profileImageFile[0];
        const publicUrl = await uploadFile('profiles', file);
        payload.profileImage = publicUrl;
      }
      const { data } = await updateProfile(profileInput.id, { ...payload });
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id !== data.profile.id ? profile : data.profile
        )
      );
      resetProfileInput();
      setIsFormModalOpen(false);
      showNotification({ message: 'profile updated' });
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id) => () => {
    const profile = profiles.find((profile) => profile.id === id);
    setProfileInput(profile);
    setIsFormModalOpen(true);
  };

  const onCancel = () => {
    resetProfileInput();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout title="About">
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="About">
        <AboutForm
          profileInput={profileInput}
          onSubmit={onSubmitEdit}
          onCancel={onCancel}
        />
      </FormModal>
      <ProfileList profiles={profiles} loading={loading} onEdit={onEdit} />
    </PanelLayout>
  );
};
