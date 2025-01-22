// Base types for common fields
interface Player {
    id: {
        stringValue: string;
    };
    firstName: {
        stringValue: string;
    };
    lastName: {
        stringValue: string;
    };
    number: {
        stringValue: string;
    };
    addedAtGameTime: {
        booleanValue: boolean;
    };
}

interface Goalie extends Player {}

// Base event fields that all events share
interface BaseEvent {
    documentChange: {
        document: {
            name: string;
            fields: {
                type: {
                    stringValue: "goal" | "penalty" | "goalieChange";
                };
                payload: {
                    mapValue: {
                        fields: {
                            period: {
                                stringValue: string;
                            };
                            team: {
                                stringValue: "home" | "visitor";
                            };
                            time?: {
                                stringValue: string;
                            };
                        };
                    };
                };
            };
            createTime: string;
            updateTime: string;
        };
        targetIds: number[];
    };
}

interface GoalEvent extends BaseEvent {
    documentChange: {
        document: {
            name: string;
            fields: {
                type: {
                    stringValue: "goal";
                };
                payload: {
                    mapValue: {
                        fields: {
                            period: {
                                stringValue: string;
                            };
                            team: {
                                stringValue: "home" | "visitor";
                            };
                            time: {
                                stringValue: string;
                            };
                            scorer: {
                                mapValue: {
                                    fields: Player;
                                };
                            };
                            goalie: {
                                mapValue: {
                                    fields: Goalie;
                                };
                            };
                            assistA?:
                                | {
                                      mapValue: {
                                          fields: Player;
                                      };
                                  }
                                | {
                                      nullValue: null;
                                  };
                            assistB?:
                                | {
                                      mapValue: {
                                          fields: Player;
                                      };
                                  }
                                | {
                                      nullValue: null;
                                  };
                        };
                    };
                };
            };
            createTime: string;
            updateTime: string;
        };
        targetIds: number[];
    };
}

interface PenaltyEvent extends BaseEvent {
    documentChange: {
        document: {
            name: string;
            fields: {
                type: {
                    stringValue: "penalty";
                };
                payload: {
                    mapValue: {
                        fields: {
                            period: {
                                stringValue: string;
                            };
                            team: {
                                stringValue: "home" | "visitor";
                            };
                            length: {
                                stringValue: string;
                            };
                            penalized: {
                                mapValue: {
                                    fields: Player & {
                                        type: {
                                            stringValue: "player";
                                        };
                                    };
                                };
                            };
                            label: {
                                stringValue: string;
                            };
                            startTime: {
                                stringValue: string;
                            };
                            servedByPlayer: {
                                mapValue: {
                                    fields: Player;
                                };
                            };
                            onTime?: {
                                stringValue: string;
                            };
                            code: {
                                stringValue: string;
                            };
                            offTime?: {
                                stringValue: string;
                            };
                        };
                    };
                };
            };
            createTime: string;
            updateTime: string;
        };
        targetIds: number[];
    };
}

interface GoalieChangeEvent extends BaseEvent {
    documentChange: {
        document: {
            name: string;
            fields: {
                type: {
                    stringValue: "goalieChange";
                };
                payload: {
                    mapValue: {
                        fields: {
                            period: {
                                stringValue: string;
                            };
                            team: {
                                stringValue: "home" | "visitor";
                            };
                            time: {
                                stringValue: string;
                            };
                            prevGoalie:
                                | {
                                      mapValue: {
                                          fields: Goalie;
                                      };
                                  }
                                | {
                                      nullValue: null;
                                  };
                            nextGoalie:
                                | {
                                      mapValue: {
                                          fields: Goalie;
                                      };
                                  }
                                | {
                                      nullValue: null;
                                  };
                        };
                    };
                };
            };
            createTime: string;
            updateTime: string;
        };
        targetIds: number[];
    };
}

// Union type for all possible events
type GameEvent = GoalEvent | PenaltyEvent | GoalieChangeEvent;

// Main type for the array of events
type GameEvents = GameEvent[];

export type { Player, Goalie, BaseEvent, GoalEvent, PenaltyEvent, GoalieChangeEvent, GameEvent, GameEvents };
