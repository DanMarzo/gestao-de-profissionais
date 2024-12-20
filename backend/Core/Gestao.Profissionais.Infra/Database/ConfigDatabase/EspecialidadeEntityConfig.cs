namespace Gestao.Profissionais.Infra.Database.ConfigDatabase;

public sealed class EspecialidadeEntityConfig : IEntityTypeConfiguration<EspecialidadeEntity>
{
    public void Configure(EntityTypeBuilder<EspecialidadeEntity> builder)
    {
        builder.ToTable("especialidades");

        builder.HasKey(x => x.Id)
            .HasName("especialidades_pk");

        builder.Property(x => x.Nome)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.TipoDocumento)
            .IsRequired();
    }
}
