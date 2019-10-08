package functions

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/rs/cors"
)

// Post is the structure both in the database
// and what is sent back to the user.
type Post struct {
	Slug      string    `json:"slug"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}

var dsClient *datastore.Client
var c *cors.Cors

// Setup the connection to datastore. Fail if
// no connection is established within 5 seconds.
func init() {
	var err error

	ctx, cancelFunc := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFunc() // Don't leak!

	// Create a datastore client. In a typical application, you would create
	// a single client which is reused for every datastore operation.
	dsClient, err = datastore.NewClient(ctx, datastore.DetectProjectID)
	if err != nil {
		log.Fatal(err)
	}

	c = cors.New(cors.Options{
		AllowedOrigins:   []string{"https://kaleyma.in", "http://localhost:*"},
		AllowedMethods:   []string{http.MethodGet},
		AllowCredentials: false,
		Debug:            true,
	})
}

// ListPostsV2 is the HTTP entry point.
func ListPostsV2(w http.ResponseWriter, r *http.Request) {
	c.HandlerFunc(w, r)
	handleError(func(w http.ResponseWriter, r *http.Request) error {
		posts, err := getPosts(dsClient)
		if err != nil {
			return err
		}
		enc := json.NewEncoder(w)
		return enc.Encode(&posts)
	}, w, r)
}

func getPosts(client *datastore.Client) ([]Post, error) {
	posts := make([]Post, 0)
	q := datastore.NewQuery("Post").Order("timestamp").Namespace("kaleyma.in-blog")
	_, err := client.GetAll(context.Background(), q, &posts)
	return posts, err
}

func handleError(fn func(w http.ResponseWriter, r *http.Request) error, w http.ResponseWriter, r *http.Request) {
	if err := fn(w, r); err != nil {
		http.Error(w, err.Error(), 500)
		log.Print(err)
	}
}
