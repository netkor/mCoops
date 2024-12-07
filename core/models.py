# core/models.py
from django.db import models
from django.core.validators import MinLengthValidator, validate_slug
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from django.urls import reverse
from imagekit.models import ProcessedImageField, ImageSpecField
from imagekit.processors import ResizeToFit
from django.utils.safestring import mark_safe
from django.contrib import admin
from django_ckeditor_5.fields import CKEditor5Field

def validate_lowercase(string):
    # https://docs.djangoproject.com/en/5.0/ref/validators/
    lower_str = string.lower()
    if string != lower_str:
        raise ValidationError("All letters must be lowercase.")

class Setting(models.Model):
    name= models.CharField(max_length=250, default="Site Name")
    name_np= models.CharField(max_length=350, default="Site Name", null=True, blank=True)
    address = models.CharField(max_length=255, default="Default Address", null=True, blank=True)
    address_np = models.CharField(max_length=355, default="Default Address", null=True, blank=True)
    phone= models.CharField(max_length=150, default="977", null=True, blank=True)
    phone1 = models.CharField(max_length=150, default="977", null=True, blank=True)
    landline = models.CharField(max_length=150, default="977", null=True, blank=True)
    landline1 = models.CharField(max_length=150, default="977", null=True, blank=True)
    email= models.EmailField(null=True, blank=True)
    map_url = models.URLField(null=True, blank=True)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    about = models.TextField( null=True, blank=True)
    mission = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    vision = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    goal = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    objective = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    slogan = models.CharField(max_length=550, default="Default Slogan", blank=True)
    image= models.ImageField(upload_to='images/')
    OFFICE_TYPE_CHOICES = [
        ('head_office', 'Head Office'),
        ('branch_office', 'Branch Office'),
        ('collection_center', 'Collection Center'),
    ]
    office_type = models.CharField(
        max_length=20,
        choices=OFFICE_TYPE_CHOICES,
        default='branch_office'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Site Setting"

class SocialLink(models.Model):
    setting = models.ForeignKey(Setting, related_name="social_links", on_delete=models.CASCADE)
    platform = models.CharField(max_length=50)  # e.g., Facebook, Twitter
    icon = models.ImageField(upload_to='social_icons/', null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    is_social_link = models.BooleanField(default=False)
    is_useful_link = models.BooleanField(default=False)
    is_affiliation= models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.platform} link"
        
class Slider(models.Model):
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='sliders/')
    link = models.URLField(null=True, blank=True)
    link_button_text = models.CharField(max_length=150, null=True, blank=True)
    display_order = models.IntegerField(null=True, blank=True)
    display_title = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    
class Testimonial(models.Model):
    name = models.CharField(max_length=150)
    name_np = models.CharField(max_length=350, null=True, blank=True)
    position = models.CharField(max_length=150, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
class Team_Type(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    order_by = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Team(models.Model):
    name = models.CharField(max_length=250)
    name_np = models.CharField(max_length=350, null=True, blank=True)
    phone = models.CharField(max_length=150, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    team_type = models.ManyToManyField('Team_Type')
    position = models.CharField(max_length=150, null=True)
    description = models.TextField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='teams/', null=True, blank=True)
    session = models.CharField(max_length=150,null=True, blank=True)
    order_by = models.IntegerField(null=True, blank=True)
    is_message_featured = models.BooleanField(default=False)
    message_order_by = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class FinancialReportType(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
    
class FinancialReport(models.Model):
    title = models.CharField(max_length=150)
    title_np = models.CharField(max_length=350, null=True, blank=True)
    financial_report_type = models.ForeignKey(FinancialReportType, on_delete=models.CASCADE)
    description = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    image = models.ImageField(upload_to='financial_reports/', null=True, blank=True)
    file = models.FileField(upload_to='financial_reports/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    
class Notice(models.Model):
    title = models.CharField(max_length=150)
    description = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    image = models.ImageField(upload_to='notices/', null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    
class Download(models.Model):
    title = models.CharField(max_length=150)
    cover = models.ImageField(upload_to='downloads/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to='downloads/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title

class Popup(models.Model):
    title = models.CharField(max_length=150,default="Popup Title", null=True)
    description = models.TextField(default="Popup Description", null=True, blank=True)
    image = models.ImageField(upload_to='popups/')
    link = models.URLField(null=True, blank=True)
    display_order = models.IntegerField(null=True, blank=True)
    display_title = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    

    
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    order = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = CKEditor5Field('Text', config_name='extends')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    image = models.ImageField(upload_to='posts/')
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    slug_guidelines = "Enter a unique, descriptive URL path (e.g. based on the title) containing " \
                      "only lowercase letters, numbers,  and hyphens (instead of spaces). "
    slug = models.SlugField(max_length=60,
                            unique=True,
                            help_text=slug_guidelines,
                            validators=[validate_slug, validate_lowercase])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    name = models.CharField(max_length=150)
    description = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class ProductDetails(models.Model):
    name = models.CharField(max_length=150)
    description = CKEditor5Field('Text', config_name='extends', null=True, blank=True) 
    banner = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    minimum_deposit = models.CharField(max_length=150, null=True, blank=True)
    withdrawal_policy = CKEditor5Field('Text', config_name='extends', null=True, blank=True)
    term_length = models.CharField(max_length=150, null=True, blank=True)
    is_renewable = models.BooleanField(default=False, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class InterestRate(models.Model):
    name = models.CharField(max_length=150, default="Interest Rate")
    product_type = models.ForeignKey(ProductDetails, on_delete=models.CASCADE)
    interest_rate = models.CharField(max_length=150, null=True, blank=True)
    effective_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    
class ContactMessage(models.Model):
    name = models.CharField(max_length=255, validators=[MinLengthValidator(1)])
    email = models.EmailField()
    message = models.TextField(max_length=5000, validators=[MinLengthValidator(10)])
    contact_time = models.DateTimeField(auto_now_add=True)
    responded_to = models.BooleanField(default=False)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return self.email
    
class CompanyProfile(models.Model):
    customers = models.IntegerField()
    staffs = models.IntegerField()
    branches = models.IntegerField()
    childCustomers = models.IntegerField(blank=True, null=True)
    savings = models.DecimalField(max_digits=16, decimal_places=2)
    loans = models.DecimalField(max_digits=16, decimal_places=2)
    shares = models.DecimalField(max_digits=16, decimal_places=2)
    capital = models.DecimalField(max_digits=16, decimal_places=2)
    funds = models.DecimalField(max_digits=16, decimal_places=2)
    effective_date = models.DateField()
    def __str__(self):
        return f"CompanyProfile {self.id} - {self.effective_date.strftime('%Y-%m-%d %H:%M:%S')}"
       
    
class Collection(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=5000, blank=True, null=True)

    slug_guidelines = "Enter a unique, descriptive URL path (e.g. based on the name) containing " \
                      "only lowercase letters, numbers,  and hyphens (instead of spaces). "

    slug = models.SlugField(max_length=50,
                            unique=True,
                            help_text=slug_guidelines,
                            validators=[validate_slug, validate_lowercase])

    published = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("collection", kwargs={"collection_slug": self.slug})

    class Meta:
        ordering = ['name']


class Photo(models.Model):
    img_guidelines = "Upload images with a width of 2000px or greater " \
                     "to avoid low visual quality (e.g. pixelation) on larger screen sizes."

    # https://django-imagekit.readthedocs.io/en/latest/#defining-specs-in-models
    # Avoid storing and serving very large uploaded image files
    large_image = ProcessedImageField(verbose_name="image file",
                                      help_text=img_guidelines,
                                      processors=[ResizeToFit(width=2000)],
                                      format='JPEG',
                                      options={'quality': 80})

    # Use to improve loading performance (photo listings and mobile images)
    small_image = ImageSpecField(source='large_image',
                                 processors=[ResizeToFit(width=550)],
                                 format='JPEG')

    # Display in the admin interface via `thumbnail_img_tag()`
    thumbnail = ImageSpecField(source='large_image',
                               processors=[ResizeToFit(width=150)],
                               format='JPEG')

    @admin.display(description='Thumbnail')
    def thumbnail_img_tag(self):
        return mark_safe('<img src="{}" />'.format(self.thumbnail.url))

    title = models.CharField(max_length=255, default="title")

    slug_guidelines = "Enter a unique, descriptive URL path (e.g. based on the title) containing " \
                      "only lowercase letters, numbers,  and hyphens (instead of spaces). "

    slug = models.SlugField(max_length=60,
                            unique=True,
                            help_text=slug_guidelines,
                            validators=[validate_slug, validate_lowercase])

    description = models.TextField(max_length=5000, default="description", blank=True) 

    loc_guidelines = "Enter the specific location where the photo was taken."
    location = models.CharField(max_length=255, help_text=loc_guidelines, default="location", blank=True)

    date_taken = models.DateField()

    # Collections are optional
    collections = models.ManyToManyField(Collection, blank=True)

    featured = models.BooleanField(default=False)

    published = models.BooleanField(default=True)

    # Use within the XML sitemap
    last_modified = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return "{} ({})".format(self.title, self.slug)

    def get_absolute_url(self):
        return reverse("photo_detail", kwargs={"slug": self.slug})

 