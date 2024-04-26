// Import PDFDocument from pdf-lib using a CDN that is compatible with Deno
import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib@1.16.0';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  // Set up CORS headers
  const headers = {
    ...corsHeaders,
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    // Handle CORS preflight request
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Process POST request to generate and upload PDF
    if (request.method === 'POST') {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      page.drawText('Hello, this is your PDF!', {
        x: 50,
        y: height - 100,
        size: 25
      });

      const pdfBytes = await pdfDoc.save();

      // Create a unique name for the PDF file
      const fileName = `${Date.now()}.pdf`;

      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      // Upload the PDF to Supabase Storage using fetch API
      const formData = new FormData();
      formData.append("file", new Blob([pdfBytes], { type: "application/pdf" }), fileName);

      const response = await fetch(`${SUPABASE_URL}/storage/v1/object/invoice-pdfs/${fileName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'apiKey': `${SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || 'Failed to upload PDF');
      }

      // Respond with the URL of the uploaded PDF
      return new Response(JSON.stringify({
        data: data,
        fileName: fileName,
        url: `${SUPABASE_URL}/storage/v1/object/invoice-pdfs/${fileName}`
      }), {
        status: 200,
        headers: headers
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: headers
    });
  }

  // If method is not OPTIONS or POST, return method not allowed
  return new Response('Method not allowed', { status: 405, headers: headers });
});