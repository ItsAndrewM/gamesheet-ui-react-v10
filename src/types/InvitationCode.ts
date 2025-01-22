export type ValidInvitationCode = {
    status: "success";
    team: {
        id: string;
        title: string;
        logo: string;
        division: {
            id: string;
            title: string;
        };
        season: {
            id: string;
            title: string;
        };
        roster: {
            players: {
                id: string;
                fullname: string;
                image: string;
            }[];
        };
    };
    invitation: {
        email: string;
        claims: {
            role: "staff" | "follower";
        };
    };
    code: string;
};

export type InvalidInvitationCode = {
    status: "error";
    message: string;
};

export type ValidatedInvitationCode = Promise<InvalidInvitationCode | ValidInvitationCode>;
