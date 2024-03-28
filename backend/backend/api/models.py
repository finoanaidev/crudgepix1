from django.db import models
class Syndic(models.Model):
    nom = models.CharField(max_length=225)
    prenom = models.CharField(max_length=255)
    mail = models.EmailField()
    telephone = models.CharField(max_length=20)
    copropriete_gere = models.CharField(max_length=200)
    def __str__(self):
        return f"{self.nom} {self.prenom}"
class DocumentCopro(models.Model):
    type = models.CharField(max_length=255)
    def __str__(self):
        return self.type
class Copropriete(models.Model):
    nom = models.CharField(max_length=255)
    adresse = models.CharField(max_length=100)
    autre_info = models.CharField(max_length=255)
    syndic = models.ForeignKey(Syndic, on_delete=models.CASCADE)
    documentcopro = models.ForeignKey(DocumentCopro, on_delete=models.CASCADE)
    def __str__(self):
        return self.nom
class Coproprietaire(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=100)
    mail = models.EmailField()
    telephone = models.CharField(max_length=20, help_text="Format: +1234567890")
    copropriete_gere = models.CharField(max_length=255)
    syndic = models.ForeignKey(Syndic, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.nom} {self.prenom}"
class Document(models.Model):
    type = models.CharField(max_length=255)
    def __str__(self):
        return self.type

class Lot(models.Model):
    copropriete = models.ForeignKey(Copropriete, on_delete=models.CASCADE)
    coproprietaire = models.ForeignKey(Coproprietaire, on_delete=models.CASCADE)
    surface = models.CharField(max_length=100)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    autre = models.CharField(max_length=255)

    def __str__(self):
        return f"Lot {self.id}"
