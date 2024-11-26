# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('settings/', views.SettingList.as_view(), name='settings'),
    path('sliders/', views.SliderList.as_view(), name='sliders'),
    path('categories/', views.CategoryList.as_view(), name='categories'),
    path('contact-messages/', views.ContactMessageList.as_view(), name='contact_messages'),
    path('downloads/', views.DownloadList.as_view(), name='downloads'),
    path('financial-report-types/', views.FinancialReportTypeList.as_view(), name='financial_report_types'),
    path('financial-reports/', views.FinancialReportList.as_view(), name='financial_reports'),
    path('interest-rates/', views.InterestRateList.as_view(), name='interest_rates'),
    path('interest-rates/<int:pk>/', views.InterestRateDetail.as_view(), name='interest_rate-detail'),
    path('notices/', views.NoticeList.as_view(), name='notices'),
    path('notices/<int:pk>/', views.NoticeDetail.as_view(), name='notice-detail'),
    path('photos/', views.PhotoList.as_view(), name='photos'),
    path('popups/', views.PopupList.as_view(), name='popups'),
    path('posts/', views.PostList.as_view(), name='posts'),
    path('products/', views.ProductList.as_view(), name='products'),
    path('product-details/', views.ProductDetailsList.as_view(), name='product_details'),
    path('product-details/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),
    path('social-links/', views.SocialLinkList.as_view(), name='social_links'),
    path('tags/', views.TagList.as_view(), name='tags'),
    path('team-types/', views.Team_TypeList.as_view(), name='team_types'),
    path('teams/', views.TeamList.as_view(), name='teams'),
    path('testimonials/', views.TestimonialList.as_view(), name='testimonials'),
    path('collections/', views.CollectionList.as_view(), name='collections'),
    path('company-profiles/', views.CompanyProfileList.as_view(), name='company_profiles'),

]