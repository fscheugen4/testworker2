export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Picture of a dog
    const exampleInputImage = await fetch(
      "https://einsundnull.de/assets/Uploads/E+N-Referenzen/Joules_thumb_up_circle.png"
    );

    const exampleMask = await fetch(
      "https://github.com/fscheugen4/testworker2/blob/main/assets/PngItem_2257855.png"
    );

    const inputs = {
      prompt: "change to mexican robot",
      image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],
      mask: [...new Uint8Array(await exampleMask.arrayBuffer())],
    };

    const response = await env.AI.run(
      "@cf/runwayml/stable-diffusion-v1-5-inpainting",
      inputs
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
  
} satisfies ExportedHandler<Env>;