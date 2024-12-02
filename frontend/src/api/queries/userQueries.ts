import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface getProfileResponse {
  user: {
    fullName: {
      firstName: string;
      lastName: string;
    };
    _id: string;
    email: string;
    username: string;
    creditPoints: number;
    profileImage: string | null;
    userLevel: number;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
}

const fetchProfile = async () => {
  const { data } = await axios.get("/api/users/profile");
  return data as getProfileResponse;
};

export const useProfileQuery = () => {
  return useQuery<getProfileResponse, Error>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};
