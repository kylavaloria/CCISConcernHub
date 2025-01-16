const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

initializeApp();

exports.closeInactiveConcerns = onSchedule("every 24 hours", async () => {
    const DEADLINE_DAYS = 30;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() - DEADLINE_DAYS);

    const db = await getFirestore();
    const concernsSnapshot = await db.collection("concerns")
        .where("recentActivityDate", "<=", deadline)
        .where("status", "!=", "Closed")
        .get();

    const batch = db.batch();
    concernsSnapshot.forEach((doc) => {
        batch.update(doc.ref, { status: "Closed" });
    });

    await batch.commit();
});
