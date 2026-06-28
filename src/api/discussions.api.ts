import api from "./axios";

export interface DiscussionUser {
  id: string;
  name: string;
  email: string;
}

export interface DiscussionReply {
  id: string;
  discussionId?: string; // Optional depending on fallback context payload
  userId: string;
  content: string;
  createdAt: string;
  user: Omit<DiscussionUser, "email">; 
}

export interface DiscussionThread {
  id: string;
  courseId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  user: DiscussionUser;
  replies: DiscussionReply[];
}

// Request Data Structures
export interface CreateDiscussionInput {
  title: string;
  content: string;
}

export interface ReplyDiscussionInput {
  content: string;
}

// Backend Envelope Wrapper Type
export interface ApiResponseEnvelope<T> {
  data: T;
}


/**
 * Fetches all discussion threads tied to a specific course tracking workspace.
 * Wraps endpoint: GET /api/v1/courses/:courseId/discussions
 */
export const getDiscussionsByCourse = async (courseId: string): Promise<DiscussionThread[]> => {
  const res = await api.get<ApiResponseEnvelope<DiscussionThread[]>>(`/courses/${courseId}/discussions`);
  // Automatically strip out the response envelope structure to keep component consumption clean
  return res.data.data;
};

/**
 * Posts an entirely new core discussion thread context block.
 * Wraps endpoint: POST /api/v1/courses/:courseId/discussions
 */
export const createDiscussion = async (
  courseId: string, 
  data: CreateDiscussionInput
): Promise<Omit<DiscussionThread, "user" | "replies">> => {
  const res = await api.post<ApiResponseEnvelope<Omit<DiscussionThread, "user" | "replies">>>(
    `/courses/${courseId}/discussions`, 
    data
  );
  return res.data.data;
};

/**
 * Commits a sub-level comment markdown block timeline solution reply.
 * Wraps endpoint: POST /api/v1/discussions/:id/replies
 */
export const replyToDiscussion = async (
  discussionId: string, 
  data: ReplyDiscussionInput
): Promise<DiscussionReply> => {
  const res = await api.post<ApiResponseEnvelope<DiscussionReply>>(
    `/discussions/${discussionId}/replies`, 
    data
  );
  return res.data.data;
};