export type RoadmapCourse = {
 id: string;
 courseId: string;
 order: number;
 status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};

export type Roadmap = {
 id: string;
 userId: string;
 generatedAt: string;
 courses: RoadmapCourse[];
};

export type Module = {
 id: number;
 name: string;
 lessons: string;
 status: "completed" | "active" | "locked";
 percentage: number;
};

export type RoadmapTrack = {
 title: string;
 trackName: string;
 stats: string;
 recommendation: string;
 modules: Module[];
};