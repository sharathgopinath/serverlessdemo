using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;

namespace Hello
{
    public static class HelloFunction
    {
        [FunctionName("Hello")]

        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");
            
            if (!await IsAuthorized(req, log))
            {
                return req.CreateResponse(HttpStatusCode.Unauthorized);
            }

            // parse query parameter
            string name = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
                .Value;

            if (name == null)
            {
                // Get request body
                dynamic data = await req.Content.ReadAsAsync<object>();
                name = data?.name;
            }

            var greetingMsg = GetRandomQuote();
            return name == null
                ? new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(JsonConvert.SerializeObject("Please pass a name on the query string or in the request body"), Encoding.UTF8)
                }
                : new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(JsonConvert.SerializeObject(greetingMsg), Encoding.UTF8)
                };
        }

        private static async Task<bool> IsAuthorized(HttpRequestMessage req, TraceWriter log)
        {
            ClaimsPrincipal principal;

            try
            {
                if ((principal = await Security.Security.ValidateTokenAsync(req.Headers.Authorization)) == null)
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                throw;
            }
            return true;
        }

        private static string GetRandomQuote()
        {
            var quotes = new List<string>{
                "It’s a magical world, Hobbes, ol’ buddy... Let’s go exploring!",
                "Sometimes I think the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.",
                "People think it must be fun to be a super genius, but they don’t realize how hard it is to put up with all the idiots in the world.",
                "I like maxims that don’t encourage behavior modification.",
                "If people could put rainbows in zoos, they’d do it.",
                "It’s hard to be religious when certain people are never incinerated by bolts of lightning.",
                "Why waste time learning, when ignorance is instantaneous?",
                "In my opinion, we don’t devote nearly enough scientific research to finding a cure for jerks.",
                "I pray for the strength to change what I can, the inability to accept what I can’t, and the incapacity to tell the difference.",
                "You know, Hobbes, some days even my lucky rocket ship underpants don’t help.",
                "Happiness isn’t good enough for me! I demand euphoria!",
                "I think night time is dark so you can imagine your fears with less distraction.",
                "Van Gogh would’ve sold more than one painting if he’d put tigers in them.",
                "The world bores you when you’re cool.",
                "Life is full of surprises, but never when you need one.",
                "If people sat outside and looked at the stars each night, I’ll bet they’d live a lot differently.",
                "Getting an inch of snow is like winning 10 cents in the lottery.",
                "So the secret to good self-esteem is to lower your expectations to the point where they’re already met?",
                "I don’t know which is worse: that everyone has his price, or that the price is always so low.",
                "The best presents don’t come in boxes.",
                "If you can’t control your peanut butter, you can’t expect to control your life.",
                "Things are never quite as scary when you’ve got a best friend.",
                "There’s never enough time to do all the nothing you want.",
                "Reality continues to ruin my life.",
                "Sometimes when I'm talking, my words can't keep up with my thoughts. I wonder why we think faster than we speak. Probably so we can think twice.",
                "You know, Hobbes, some days even my lucky rocket ship underpants don't help.",
                "I'm killing time while I wait for life to shower me with meaning and happiness.",
                "You know, sometimes kids get bad grades in school because the class moves too slow for them. Einstein got D's in school. Well guess what, I get F's!!!",
                "I'm a misunderstood genius.",
                "What's misunderstood?",
                "Nobody thinks I'm a genius.",
                "When life gives you lemons, chunk it right back.",
                "You know, sometimes the world seems like a pretty mean place.",
                "I'm not dumb. I just have a command of thoroughly useless information.",
                "There's no problem so awful, that you can't add some guilt to it and make it even worse.",
                "Life's a lot more fun when you aren't responsible for your actions.",
                "Life is like topography, Hobbes. There are summits of happiness and success, flat stretches of boring routine and valleys of frustration and failure.",
                "A day can really slip by when you're deliberately avoiding what you're supposed to do.",
                "Getting an inch of snow is like winning 10 cents in the lottery.",
                "Look! A trickle of water running through some dirt! I'd say our afternoon just got booked solid!"
            };

            var random = new Random();
            var quoteNum = random.Next(0, quotes.Count);
            return quotes[quoteNum];
        }
    }
}
