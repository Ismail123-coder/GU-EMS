export const createEvent = async (req, res) => {
  const { title, description, eventDate, venue } = req.body;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      eventDate: new Date(eventDate),
      venue,
      organizerId: req.user.id,
      status: "PENDING"
    }
  });

  res.json({ message: "Event submitted for approval", event });
};
export const getEvents = async (req, res) => {
  const events = await prisma.event.findMany({
    where: { status: "APPROVED" },
    include: {
      organizer: { select: { name: true } }
    }
  });

  res.json(events);
};

