export default function handler(req, res) {
  const data = [
    { name: "Hotel Booking - Dubai", price: 10 },
    { name: "Car Rental - BMW", price: 7 },
    { name: "Restaurant Dinner", price: 2 },
    { name: "Medical Appointment", price: 5 }
  ];

  res.status(200).json(data);
}
