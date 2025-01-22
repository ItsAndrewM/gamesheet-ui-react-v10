import type { Goalie } from "./PlayByPlay";

interface TimeStamp {
    mapValue: {
        fields: {
            period: {
                stringValue: string;
            };
            time: {
                stringValue: string;
            };
        };
    };
}

interface GoalieShift {
    documentChange: {
        document: {
            name: string;
            fields: {
                team: {
                    stringValue: "home" | "visitor";
                };
                on: TimeStamp;
                off:
                    | TimeStamp
                    | {
                          nullValue: null;
                      };
                goalie:
                    | {
                          mapValue: {
                              fields: Goalie;
                          };
                      }
                    | {
                          nullValue: null;
                      };
                duration: {
                    integerValue: string;
                };
            };
            createTime: string;
            updateTime: string;
        };
        targetIds: number[];
    };
}

type GoalieShifts = GoalieShift[];

export type { TimeStamp, GoalieShift, GoalieShifts };
