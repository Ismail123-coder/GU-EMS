import prisma from "../config/prisma.js";
import QRCode from "qrcode";

// Generate QR code for an event
export const generateEventQR = async (req, res) => {
  const { eventId } = req.params;

  const event = await prisma.event.findUnique({
    where: { id: parseInt(eventId) },
  });

  if (!event || event.status !== "APPROVED") {
    return res.status(404).json({ message: "Event not found or not approved" });
  }

  // QR will encode: eventId
  const qrData = `event-${event.id}`;
  const qrCode = await QRCode.toDataURL(qrData); // Base64 image

  res.json({ qrCode, event });
};
// Scan QR and mark attendance
export const markAttendance = async (req, res) => {
  const { qrData, userId } = req.body;

  // qrData = "event-<id>"
  const eventId = parseInt(qrData.split("-")[1]);

  const registration = await prisma.registration.findUnique({
    where: {
      userId_eventId: {
        userId: parseInt(userId),
        eventId: eventId,
      },
    },
  });

  if (!registration) {
    return res.status(400).json({ message: "User not registered for this event" });
  }

  if (registration.attended) {
    return res.status(400).json({ message: "Attendance already marked" });
  }

  await prisma.registration.update({
    where: {
      id: registration.id,
    },
    data: { attended: true },
  });

  res.json({ message: "Attendance marked successfully" });
};
