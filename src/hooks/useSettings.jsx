import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const token = () => localStorage.getItem("token");

// ======================
// GET PROFILE
// GET /profile/get
// ======================
const getProfile = async () => {
  const { data } = await axios.get(`${URL}/profile/get`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ======================
// EDIT PROFILE
// PUT /profile/edit
// ======================
const editProfile = async (profileData) => {
  const { data } = await axios.put(`${URL}/profile/edit`, profileData, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Edit profile error:", error);
    },
  });
};

// ======================
// UPDATE PROFILE PICTURE
// PUT /profile/update-picture
// ======================
const updateProfilePicture = async (formData) => {
  const { data } = await axios.put(`${URL}/profile/update-picture`, formData, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Update profile picture error:", error);
    },
  });
};

// ======================
// CHANGE PASSWORD
// PUT /profile/change-password
// ======================
const changePassword = async (passwordData) => {
  const { data } = await axios.put(`${URL}/profile/change-password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // Optionally invalidate any relevant queries
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Change password error:", error);
    },
  });
};

// ======================
// UPDATE THEME
// PUT /profile/themesetup
// ======================
const updateTheme = async (theme) => {
  const { data } = await axios.put(
    `${URL}/profile/themesetup`,
    { theme },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
  return data;
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });
};

// ======================
// GET CURRENT THEME
// GET /profile/gettheme
// ======================
const getTheme = async () => {
  const { data } = await axios.get(`${URL}/profile/gettheme`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useTheme = () => {
  return useQuery({
    queryKey: ["theme"],
    queryFn: getTheme,
  });
};

// ======================
// GET NOTIFICATIONS
// GET /notification/get
// ======================
const getNotifications = async () => {
  const { data } = await axios.get(`${URL}/notification/get`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};

// ======================
// MARK NOTIFICATION AS READ
// PUT /notification/read/:notificationid
// ======================
const markNotificationRead = async (notificationid) => {
  const { data } = await axios.put(
    `${URL}/notification/read/${notificationid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
  return data;
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

// ======================
// GET ACTIVITY
// GET /activity/get
// ======================
const getActivity = async () => {
  const { data } = await axios.get(`${URL}/activity/get`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useActivity = () => {
  return useQuery({
    queryKey: ["activity"],
    queryFn: getActivity,
  });
};

// ======================
// UPDATE ACTIVITY
// POST /activity/update
// ======================
const updateActivity = async (activityData) => {
  const { data } = await axios.post(`${URL}/activity/update`, activityData, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
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

// ======================
// GET BLOCKED USERS
// GET /connection/blocked
// ======================
const getBlockedUsers = async () => {
  const { data } = await axios.get(`${URL}/connection/blocked`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const useBlockedUsers = () => {
  return useQuery({
    queryKey: ["blockedUsers"],
    queryFn: getBlockedUsers,
  });
};