module.exports = row => {
    return person = {
        id: row.id,
        name: row.name,
        isBetaMember: ( row.isBetaMember == 1) ? true: false,
        createdAt: row.pCreatedAt,
        updatedAt: row.pUpdatedAt,
        userId: row.userId,
        user: {
            id: row.userId,
            firstName: row.firstName,
            lastName: row.lastName,
            createdAt: row.uCreatedAt,
            updatedAt: row.uUpdatedAt,
        }
    };
}