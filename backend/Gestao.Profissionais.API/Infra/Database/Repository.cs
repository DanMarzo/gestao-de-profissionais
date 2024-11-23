using Gestao.Profissionais.API.Application.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Gestao.Profissionais.API.Infra.Database;

public class Repository : IRepository
{
    private readonly ApplicationDataContext context;
    public Repository(ApplicationDataContext context) { this.context = context; }

    public async Task<int> AddAsync<T>(T entity) where T : class
    {
        await this.context.Set<T>().AddAsync(entity);
        return await this.context.SaveChangesAsync();
    }

    public async Task DeleteAsync<T>(T entity) where T : class
    {
        this.context.Set<T>().Remove(entity);
        await this.context.SaveChangesAsync();
    }

    public async Task<bool> EntityExists<T>(Expression<Func<T, bool>> filter) where T : class
    {
        return await this.context.Set<T>().AnyAsync(filter);
    }

    public async Task<int> ExecuteDeleteAsync<T>(Expression<Func<T, bool>> where) where T : class
    {
        return await this.context.Set<T>()
            .Where(where)
            .ExecuteDeleteAsync();
    }

    public async Task<int> ExecuteUpdateAsync<T>(Expression<Func<T, bool>> where, Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setPropertyCalls) where T : class
    {
        return await this.context.Set<T>()
            .Where(where)
            .ExecuteUpdateAsync(setPropertyCalls);
    }

    public async Task<IEnumerable<T>> GetEntities<T>(Expression<Func<T, bool>> where) where T : class
    {
        return await this.context.Set<T>().Where(where).ToListAsync();
    }

    public async Task<IEnumerable<T>> GetEntities<T>() where T : class
    {
        return await this.context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetEntityAsync<T>(Expression<Func<T, bool>> where, bool disableTracking = true, List<Expression<Func<T, object>>>? includes = null) where T : class
    {
        IQueryable<T> query = this.context.Set<T>();
        if (disableTracking) query = query.AsNoTracking();

        if (includes != null)
            query = includes.Aggregate(query, (current, include) => current.Include(include));

        var result = await query.FirstOrDefaultAsync(where);
        return result;
    }

    public async Task<int> UpdateAsync<T>(T entity) where T : class
    {
        this.context.Set<T>().Attach(entity);
        this.context.Entry(entity).State = EntityState.Modified;
        return await context.SaveChangesAsync();
    }
}
