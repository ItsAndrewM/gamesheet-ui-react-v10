export function determinePlayerDisplay(event: any) {
    const { type } = event;
    const returnArray = [] as string[];
    if (type.toLowerCase().includes("goal")) {
        const { assist, scorer } = event.for || {};
        const { firstName, lastName, jersey } = scorer || {};
        returnArray.push(`#${jersey} ${firstName} ${lastName}`);
        const [assistA, assistB] = assist || [];
        const { firstName: assistFirstName, lastName: assistLastName, jersey: assistNumber } = assistA || {};
        if (assistFirstName) {
            returnArray.push(`#${assistNumber} ${assistFirstName} ${assistLastName}`);
        }
        const { firstName: assistBFirstName, lastName: assistBLastName, jersey: assistBNumber } = assistB || {};
        if (assistBFirstName) {
            returnArray.push(`#${assistBNumber} ${assistBFirstName} ${assistBLastName}`);
        }
    }
    if (type.toLowerCase().includes("penalty")) {
        const { penalty, for: forObj } = event || {};
        const { player } = forObj || {};
        const { label, length } = penalty || {};

        // const { penalized, servedByPlayer, label, length } = player;
        const { firstName, lastName, jersey } = player || {};
        returnArray.push(`#${jersey} ${firstName} ${lastName}`);
        returnArray.push(`${label}, ${length} MIN`);
        // const {
        //     firstName: servedByFirstName,
        //     lastName: servedByLastName,
        //     number: servedByNumber,
        // } = servedByPlayer.mapValue.fields;
        // if (
        //     servedByFirstName.stringValue !== firstName.stringValue &&
        //     servedByLastName.stringValue !== lastName.stringValue &&
        //     servedByNumber.stringValue !== number.stringValue
        // ) {
        //     returnArray.push("Served by");
        //     returnArray.push(
        //         `#${servedByNumber.stringValue} ${servedByFirstName.stringValue} ${servedByLastName.stringValue}`,
        //     );
        // }
    }
    if (type.toLowerCase().includes("shift") && event.shift?.toLowerCase().includes("start")) {
        const { player: goalie } = event || {};
        const { firstName, lastName, jersey } = goalie || {};
        returnArray.push(`#${jersey} ${firstName} ${lastName}`);
        returnArray.push("Replacing:");
    }
    // if (type.toLowerCase().includes("shift") && event.shift?.toLowerCase().includes("start")) {
    //     const { fields } = event;
    //     const { nextGoalie, prevGoalie } = fields.payload.mapValue.fields;
    //     const {
    //         firstName: nextFirstName,
    //         lastName: nextLastName,
    //         number: nextNumber,
    //     } = nextGoalie.mapValue?.fields || {};
    //     const {
    //         firstName: prevFirstName,
    //         lastName: prevLastName,
    //         number: prevNumber,
    //     } = prevGoalie.mapValue?.fields || {};
    //     if (nextNumber) {
    //         returnArray.push(`#${nextNumber.stringValue} ${nextFirstName.stringValue} ${nextLastName.stringValue}`);
    //     }
    //     if (!nextNumber) {
    //         returnArray.push(`Empty net`);
    //     }
    //     if (prevNumber) {
    //         returnArray.push(
    //             `Replacing: #${prevNumber.stringValue} ${prevFirstName.stringValue} ${prevLastName.stringValue}`,
    //         );
    //     }
    //     if (!prevNumber) {
    //         returnArray.push("Replacing: empty net");
    //     }
    // }
    return returnArray;
}
