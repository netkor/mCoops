# your_app/middleware.py

from django.conf import settings
from django.http import JsonResponse

class ApiKeyMiddleware:
    """
    Middleware to check if the correct API key is provided in the request headers.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check for the API key in the request header
        api_key = request.headers.get('X-API-KEY')
        
        # If the API key is missing or incorrect, return 403 Forbidden
        if not api_key or api_key != settings.API_KEY:
            return JsonResponse({"error": "Unauthorized - Invalid or missing API key"}, status=403)
        
        # Proceed with the request if the key is correct
        response = self.get_response(request)
        return response
