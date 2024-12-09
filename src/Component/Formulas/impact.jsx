export default function Impact(k, a, allK, allA) {
    return ((k + (0.8 * a)) / (allK + 0.8 * allA))
}