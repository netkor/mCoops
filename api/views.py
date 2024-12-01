# api/views/posts.py
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view



from core.models import (
    Setting, Slider, Category, ContactMessage, Download, FinancialReportType, FinancialReport, 
    InterestRate, Notice, Photo, Popup, Post, Product, ProductDetails, SocialLink, 
    Tag, Team_Type, Team, Testimonial, Collection,CompanyProfile
)
from .serializers import (
    SettingSerializer, SliderSerializer, CategorySerializer, ContactMessageSerializer, DownloadSerializer, 
    FinancialReportTypeSerializer, FinancialReportSerializer, InterestRateSerializer, 
    NoticeSerializer, PhotoSerializer, PopupSerializer, PostSerializer, ProductSerializer, 
    ProductDetailsSerializer, SocialLinkSerializer, TagSerializer, Team_TypeSerializer, 
    TeamSerializer, TestimonialSerializer, CollectionSerializer, InterestRateDetailSerializer,CompanyProfileSerializer
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

class ContactMessageListView(APIView):
    def get(self, request):
        contact_messages = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(contact_messages, many=True)
        return Response(serializer.data)
    # post method for contact message
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactMessagePost(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    
class InterestRateDetail(APIView):
    def get(self, request, pk):
        interest_rate = InterestRate.objects.filter(product_type_id=pk, end_date__isnull=True)
        serializer = InterestRateDetailSerializer(interest_rate, many=True)
        return Response(serializer.data)

class NoticeList(APIView):
    def get(self, request):
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)
    
class NoticeDetail(APIView):
    def get(self, request, pk):
        try:
            notice = Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = NoticeSerializer(notice)
        return Response(serializer.data)    

class CollectionList(APIView):
    def get(self, request):
        collections = Collection.objects.all()
        serializer = CollectionSerializer(collections, many=True)
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

class CompanyProfileList(APIView):
    def get(self, request):
        company_profile = CompanyProfile.objects.all()
        serializer = CompanyProfileSerializer(company_profile, many=True)
        return Response(serializer.data)    


     