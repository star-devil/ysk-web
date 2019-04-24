from django.shortcuts import render
from apps.cms.models import InstitutionNews


def index(request):
    newses = InstitutionNews.objects.all()[:3]
    context = {
        'newses': newses
    }
    return render(request, 'index.html', context=context)
