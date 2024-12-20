namespace Gestao.Profissionais.Infra.Database.ConfigDatabase;

public sealed class ProfissionalEntityConfig : IEntityTypeConfiguration<ProfissionalEntity>
{
    public void Configure(EntityTypeBuilder<ProfissionalEntity> builder)
    {
        builder.ToTable("profissionais");

        builder.HasKey(x => x.Id)
            .HasName("profissional_pk");

        builder.Property(x => x.NumeroDocumento)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.Nome)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.CriadoEm)
            .IsRequired();
    }
}
