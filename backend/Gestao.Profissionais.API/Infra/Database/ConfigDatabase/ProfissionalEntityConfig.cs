﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gestao.Profissionais.API.Infra.Database.ConfigDatabase;

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
    }
}
