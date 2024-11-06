package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pusher/pusher-http-go"
)

func main() {
    app := fiber.New()

	app.Use(cors.New())
	
	pusherClient := pusher.Client{
		AppID: "1888379",
		Key: "7ca408a21e8f1e15fc50",
		Secret: "98c613df0f1d652e9f41",
		Cluster: "eu",
		Secure: true,
	  }
	  
    app.Post("/api/messages", func(c *fiber.Ctx) error {
		var data map[string]string

		if err := c.BodyParser(&data); err != nil {
			return err
		}
		
		pusherClient.Trigger("chat", "message", data)
		
		return c.JSON([]string{})
    })

    log.Fatal(app.Listen(":8000"))
	// app.Listen(":8000")
}
