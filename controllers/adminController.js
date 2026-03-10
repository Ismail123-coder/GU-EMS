import prisma from "../config/prisma.js";

// Get all pending events
export const getPendingEvents = async (req, res) => {
  const events = await prisma.event.findMany({
    where: { status: "PENDING" },
    include: { organizer: { select: { name: true } } }
  });

  res.json(events);
};

// Approve or Reject event
export const updateEventStatus = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.body; // APPROVED / REJECTED

  await prisma.event.update({
    where: { id: parseInt(eventId) },
    data: { status }
  });

  res.json({ message: `Event ${status}` });
};
