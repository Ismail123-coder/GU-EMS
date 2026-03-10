if (!user) {
  return res.status(404).json({ message: "User not found" });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({ message: "Invalid credentials" });
}

if (user.role !== "ADMIN" && !user.isApproved) {
  return res.status(403).json({ message: "Wait for admin approval" });
}

const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({ token, role: user.role });
