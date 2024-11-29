from rest_framework import serializers
from core.models import Setting, Slider, Category, ContactMessage, Download, FinancialReportType, FinancialReport, InterestRate, Notice, Photo, Popup, Post, Product, ProductDetails,SocialLink, Tag, Team_Type, Team, Testimonial, Collection,CompanyProfile

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = '__all__'

class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class DownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = '__all__'

class FinancialReportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialReportType
        fields = '__all__'

class FinancialReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialReport
        fields = '__all__'

class InterestRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestRate
        fields = '__all__'

class InterestRateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestRate
        fields = ('id', 'interest_rate', 'effective_date', 'end_date')

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class PopupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Popup
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = '__all__'

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class Team_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team_Type
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    team_type = Team_TypeSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'        

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = '__all__'