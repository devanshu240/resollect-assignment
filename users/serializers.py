from rest_framework import serializers
from django.contrib.auth import get_user_model  # ✅

User = get_user_model()  # ✅ get CustomUser dynamically

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  # ✅ Now uses CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
