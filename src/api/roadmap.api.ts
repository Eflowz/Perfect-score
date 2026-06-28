import api from "./axios";
import type { Roadmap } from "../types/roadmap";

type RoadmapResponse = Roadmap | { data: Roadmap };

const unwrapRoadmap = (response: RoadmapResponse) =>
  "data" in response ? response.data : response;

export const getUserRoadmap = async () => {
  const res = await api.get<RoadmapResponse>("/roadmap");

  return unwrapRoadmap(res.data);
};

export const generateRoadmap = async () => {
  const res = await api.post<RoadmapResponse>("/roadmap/generate");

  return unwrapRoadmap(res.data);
};
