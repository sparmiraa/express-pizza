import { Router } from "express";

const router = new Router()

router.get("/users", (req, res) => {
    res.json({
      users: [
        { id: 1, name: "Miroslav" },
        { id: 2, name: "Alisa" }
      ]
    });
  });
  
  export default router;