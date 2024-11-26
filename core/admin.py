# admin.py
from django.contrib import admin
from .models import (
    Setting, SocialLink, Slider, Testimonial, Team_Type, Team, 
    FinancialReportType, FinancialReport, Notice, Download, Popup, 
    Category, Tag, Post, Product, ProductDetails, InterestRate, 
    ContactMessage, Collection, Photo,CompanyProfile
)
# def custom_upload_function(instance, filename):
#     # Your logic for handling the upload
#     return f'uploads/{filename}'  # Example return statement
# Setting Model Admin
@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ('name','name_np', 'address', 'phone', 'email', 'is_active')
    search_fields = ('name', 'address', 'email')
    ordering = ('-created_at',)

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url')
    search_fields = ('platform', 'url')

@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active')
    search_fields = ('title',)
    list_filter = ('is_active',)

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active')
    search_fields = ('name', 'position')

@admin.register(Team_Type)
class TeamTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    search_fields = ('name',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active')
    search_fields = ('name', 'position')

@admin.register(FinancialReportType)
class FinancialReportTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    search_fields = ('name',)

@admin.register(FinancialReport)
class FinancialReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'financial_report_type', 'is_active')
    search_fields = ('title',)

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active')
    search_fields = ('title',)

@admin.register(Download)
class DownloadAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active')
    search_fields = ('title',)

@admin.register(Popup)
class PopupAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active')
    search_fields = ('title',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published')
    search_fields = ('title', 'author__username')  # Assuming you're using the default User model
    list_filter = ('is_published', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}  # Automatically fill slug field

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(ProductDetails)
class ProductDetailsAdmin(admin.ModelAdmin):
    list_display = ('name', 'product', 'minimum_deposit', 'is_active')
    search_fields = ('name',)

@admin.register(InterestRate)
class InterestRateAdmin(admin.ModelAdmin):
    list_display = ('product_type', 'interest_rate', 'effective_date', 'end_date', 'created_at', 'updated_at')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email_address', 'responded_to', 'resolved')
    search_fields = ('first_name', 'last_name', 'email_address')

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'published')
    search_fields = ('name',)

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_taken', 'published')
    search_fields = ('title', 'location')

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ('customers', 'staffs', 'branches', 'savings', 'loans', 'shares', 'capital', 'effective_date')
    search_fields = ('effective_date',)



# You can also register them without a custom ModelAdmin class if you prefer.
# For example:
# admin.site.register(SocialLink)
# admin.site.register(Slider)
# ...and so on for the other models.