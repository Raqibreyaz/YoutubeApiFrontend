import axios from "axios";   


// Function to get YouTube video URL by title
async function getYouTubeVideoURLByTitle(title, apiKey) {
  try {
    // Make API request to search for videos by title
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: title,
        type: 'video',
        key: apiKey,
      },
    });
 
    // Extract video ID from API response
    const videoId = response.data.items[0].id.videoId;

    // Construct video URL
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

    return videoURL;
  } catch (error) {
    console.error('Error retrieving YouTube video URL:', error);
    return null;
  }
}

export default getYouTubeVideoURLByTitle;
