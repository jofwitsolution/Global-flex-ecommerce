import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../services/userService';

export function useProfileUpdate() {
  return useMutation(updateProfile, {
    mutationKey: 'profile-update',
  });
}
