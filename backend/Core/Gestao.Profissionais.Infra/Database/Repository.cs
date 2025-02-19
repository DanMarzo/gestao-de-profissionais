﻿namespace Gestao.Profissionais.Infra.Database;

public class Repository : IRepository
{
    private readonly ApplicationDataContext context;
    public Repository(ApplicationDataContext context) { this.context = context; }

    public async Task<T> AddAsync<T>(T entity) where T : class
    {
        await context.Set<T>().AddAsync(entity);
        return entity;
    }
    public void Delete<T>(T entity) where T : class
    {
        context.Set<T>().Remove(entity);
    }

    public async Task<bool> EntityExists<T>(Expression<Func<T, bool>> filter) where T : class
    {
        return await context.Set<T>().AnyAsync(filter);
    }

    public async Task<int> ExecuteDeleteAsync<T>(Expression<Func<T, bool>> where) where T : class
    {
        return await context.Set<T>()
            .Where(where)
            .ExecuteDeleteAsync();
    }

    public async Task<int> ExecuteUpdateAsync<T>(Expression<Func<T, bool>> where, Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setPropertyCalls) where T : class
    {
        return await context.Set<T>()
            .Where(where)
            .ExecuteUpdateAsync(setPropertyCalls);
    }

    public async Task<IEnumerable<T>> GetEntities<T>(Expression<Func<T, bool>> where) where T : class
    {
        return await context.Set<T>().Where(where).ToListAsync();
    }

    public async Task<IEnumerable<T>> GetEntities<T>() where T : class
    {
        return await context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetEntityAsync<T>(Expression<Func<T, bool>> where, bool disableTracking = true, List<Expression<Func<T, object>>>? includes = null) where T : class
    {
        IQueryable<T> query = context.Set<T>();
        if (disableTracking) query = query.AsNoTracking();

        if (includes != null)
            query = includes.Aggregate(query, (current, include) => current.Include(include));

        var result = await query.FirstOrDefaultAsync(where);
        return result;
    }

    public void Update<T>(T entity) where T : class
    {
        context.Set<T>().Attach(entity);
        context.Entry(entity).State = EntityState.Modified;
    }
    public async Task<IEnumerable<T>> ListEntities<T>(RequestListModel request) where T : class
    {
        var entities = await context.Set<T>().Skip(request.CalcularItensAPular()).Take(request.Qtde).ToListAsync();
        return entities;
    }
    public async Task<IEnumerable<T>> ListEntities<T>(RequestListModel request, Expression<Func<T, bool>> where) where T : class
    {
        var entities = await context.Set<T>().Where(where).Skip(request.CalcularItensAPular()).Take(request.Qtde).ToListAsync();
        return entities;
    }

    public async Task<int> CountAsync<T>(Expression<Func<T, bool>> where) where T : class
    {
        var count = await context.Set<T>().CountAsync(where);
        return count;
    }
    public async Task<int> CountAsync<T>() where T : class
    {
        var count = await context.Set<T>().CountAsync();
        return count;
    }

    public async Task<IEnumerable<T>> ListEntities<T>(RequestListModel request, List<Expression<Func<T, object>>> includes) where T : class
    {
        IQueryable<T> query = context.Set<T>();
        if (includes != null)
            query = includes.Aggregate(query, (current, include) => current.Include(include));
        return await query.Skip(request.CalcularItensAPular()).Take(request.Qtde).ToListAsync();
    }

    public async Task<IEnumerable<T>> ListEntities<T>(RequestListModel request, List<Expression<Func<T, object>>> includes, Expression<Func<T, bool>>? where) where T : class
    {
        IQueryable<T> query = context.Set<T>();

        if (where is not null)
            query = query.Where(where);

        if (includes is not null)
            query = includes.Aggregate(query, (current, include) => current.Include(include));

        return await query.Skip(request.CalcularItensAPular()).Take(request.Qtde).ToListAsync();
    }

    public async Task<int> SaveChangesAsync()
    {
        return await this.context.SaveChangesAsync();
    }
}
