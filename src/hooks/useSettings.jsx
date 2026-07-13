import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

// ================= FIXED: Get token with each request ================= //
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ================= PROFILE ================= //

// Dashboard / Account Info
const getProfile = async () => {
  const { data } = await axios.get(
    `${URL}/profile/dashboard`,
    getAuthConfig()
  );
  return data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

// Edit Profile (Bio + Profile Picture)
const editProfile = async (formData) => {
  const { data } = await axios.put(
    `${URL}/profile/edit`,
    formData,
    {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};

// ================= PROFILE PICTURE ================= //

const updateProfilePicture = async (formData) => {
  const { data } = await axios.put(
    `${URL}/profile/edit`,
    formData,
    {
      ...getAuthConfig(),
      headers: {
        ...getAuthConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};

// ================= CHANGE PASSWORD ================= //
const changePassword = async (passwordData) => {
  const { data } = await axios.put(
    `${URL}/profile/changepassword`,
    passwordData,
    getAuthConfig()
  );

  return data;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};

// ================= NOTIFICATIONS ================= //

const getNotifications = async () => {
  const { data } = await axios.get(
    `${URL}/notification/get`,
    getAuthConfig()
  );

  return data;
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};

// Read Notification
const readNotification = async (notificationid) => {
  const { data } = await axios.put(
    `${URL}/notification/read/${notificationid}`,
    {},
    getAuthConfig()
  );

  return data;
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

// ================= ACTIVITY ================= //

const getActivity = async () => {
  const { data } = await axios.get(
    `${URL}/activity/get`,
    getAuthConfig()
  );

  return data;
};

export const useActivity = () => {
  return useQuery({
    queryKey: ["activity"],
    queryFn: getActivity,
  });
};

const updateActivity = async (activityData) => {
  const { data } = await axios.post(
    `${URL}/activity/update`,
    activityData,
    getAuthConfig()
  );

  return data;
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activity"],
      });
    },
  });
};

// ================= BLOCKED USERS ================= //

const getBlockedUsers = async () => {
  const { data } = await axios.get(
    `${URL}/connection/blocked`,
    getAuthConfig()
  );

  return data;
};

export const useBlockedUsers = () => {
  return useQuery({
    queryKey: ["blockedUsers"],
    queryFn: getBlockedUsers,
  });
};

const clearAuthData = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// ================= DELETE ACCOUNT ================= //
const deleteAccount = async () => {
  const { data } = await axios.delete(
    `${URL}/profile/deleteacc`,
    getAuthConfig()
  );

  return data;
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      clearAuthData();
      queryClient.clear();
    },
  });
};

// ================= LOGOUT ================= //

const logout = async () => {
  const { data } = await axios.post(
    `${URL}/exit/logout`,
    {},
    getAuthConfig()
  );

  return data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      clearAuthData();
      queryClient.clear();
    },
  });
};