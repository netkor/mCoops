# api/views/posts.py
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


from core.models import (
    Setting, Slider, Category, ContactMessage, Download, FinancialReportType, FinancialReport, 
    InterestRate, Notice, Photo, Popup, Post, Product, ProductDetails, SocialLink, 
    Tag, Team_Type, Team, Testimonial
)
from .serializers import (
    SettingSerializer, SliderSerializer, CategorySerializer, ContactMessageSerializer, DownloadSerializer, 
    FinancialReportTypeSerializer, FinancialReportSerializer, InterestRateSerializer, 
    NoticeSerializer, PhotoSerializer, PopupSerializer, PostSerializer, ProductSerializer, 
    ProductDetailsSerializer, SocialLinkSerializer, TagSerializer, Team_TypeSerializer, 
    TeamSerializer, TestimonialSerializer
)
class SettingList(APIView):
    def get(self, request):
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)
class SliderList(APIView):
    def get(self, request):
        sliders = Slider.objects.all()
        serializer = SliderSerializer(sliders, many=True)
        return Response(serializer.data)

class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class ContactMessageList(APIView):
    def get(self, request):
        contact_messages = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(contact_messages, many=True)
        return Response(serializer.data)

class DownloadList(APIView):
    def get(self, request):
        downloads = Download.objects.all()
        serializer = DownloadSerializer(downloads, many=True)
        return Response(serializer.data)

class FinancialReportTypeList(APIView):
    def get(self, request):
        financial_report_types = FinancialReportType.objects.all()
        serializer = FinancialReportTypeSerializer(financial_report_types, many=True)
        return Response(serializer.data)

class FinancialReportList(APIView):
    def get(self, request):
        financial_reports = FinancialReport.objects.all()
        serializer = FinancialReportSerializer(financial_reports, many=True)
        return Response(serializer.data)

class InterestRateList(APIView):
    def get(self, request):
        interest_rates = InterestRate.objects.all()
        serializer = InterestRateSerializer(interest_rates, many=True)
        return Response(serializer.data)

class NoticeList(APIView):
    def get(self, request):
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)

class PhotoList(APIView):
    def get(self, request):
        photos = Photo.objects.all()
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)

class PopupList(APIView):
    def get(self, request):
        popups = Popup.objects.all()
        serializer = PopupSerializer(popups, many=True)
        return Response(serializer.data)

class PostList(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductDetailsList(APIView):
    def get(self, request):
        product_details = ProductDetails.objects.all()
        serializer = ProductDetailsSerializer(product_details, many=True)
        return Response(serializer.data)
    
class ProductDetail(APIView):
    def get(self, request, pk):
        try:
            product_detail = ProductDetails.objects.get(pk=pk)
        except ProductDetails.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductDetailsSerializer(product_detail)
        return Response(serializer.data)    

class SocialLinkList(APIView):
    def get(self, request):
        social_links = SocialLink.objects.all()
        serializer = SocialLinkSerializer(social_links, many=True)
        return Response(serializer.data)

class TagList(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

class Team_TypeList(APIView):
    def get(self, request):
        team_types = Team_Type.objects.all()
        serializer = Team_TypeSerializer(team_types, many=True)
        return Response(serializer.data)

class TeamList(APIView):
    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

class TestimonialList(APIView):
    def get(self, request):
        testimonials = Testimonial.objects.all()
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)