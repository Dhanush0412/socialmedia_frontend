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
  console.log("Profile API Response:", data);
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

// ================= CHANGE PASSWORD - FIXED ================= //

const changePassword = async (passwordData) => {
  console.log("Sending password change request:", passwordData);
  
  try {
    const { data } = await axios.put(
      `${URL}/profile/changepassword`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("Password change response:", data);
    return data;
  } catch (error) {
    console.error("Password change error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error;
  }
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
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

// ================= THEME ================= //

const updateTheme = async (theme) => {
  const { data } = await axios.put(
    `${URL}/profile/themesetup`,
    { theme },
    getAuthConfig()
  );

  return data;
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["theme"],
      });
    },
  });
};

// Get Theme
const getTheme = async () => {
  const { data } = await axios.get(
    `${URL}/profile/gettheme`,
    getAuthConfig()
  );

  return data;
};

export const useTheme = () => {
  return useQuery({
    queryKey: ["theme"],
    queryFn: getTheme,
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